import { useState, useEffect, useMemo, useCallback } from "react";
import type { RankingObject, Match } from "../types/RankingTypes";

import { character_keys } from "../CharacterKeys";

interface PlayerInfoType {
    playerRankRes: RankingObject[]
    playerRes: {
        steamID:string;
        matches:Match[];
        names:string[];
        characters:number[]
    }
}

interface Props {
    steamID:string
}

const PlayerDetails:React.FC<Props> = (props) => {
    const {steamID} = props;

    const [playerInfo, setPlayerInfo] = useState<PlayerInfoType>();
    const [mostPlayedCharacter, setMostPlayedCharacter] = useState<number>(0);

    const getDetails = async() => {
        const res = await fetch(`https://bbranking.duckdns.org/player/${steamID}`);
        // const res = await fetch(`http://localhost:5000/player/${steamID}`);
        const resJson = await res.json();
        console.log(resJson);
        setPlayerInfo(resJson);
    }

    const getMostPlayedCharacter = useCallback(() => {
        let mostPlayed = 0;
        if(playerInfo){
            for(let i = 0; i < playerInfo.playerRes.characters.length; i++){
                mostPlayed = (playerInfo.playerRes.characters[mostPlayed] > playerInfo.playerRes.characters[i]?mostPlayed:i);
            }
        }
        setMostPlayedCharacter(mostPlayed);
    },[playerInfo]);

    useEffect(() => {
        getDetails();
    }, []);

    useEffect(() => {
        getMostPlayedCharacter()
    }, [playerInfo]);

    return(
        <div>
            <div>
                {playerInfo?.playerRes.names[0]}
            </div>
            <img
                src={character_keys[mostPlayedCharacter].full_body_url}
            />
            <div>
                {playerInfo?.playerRes.characters.map((e:number, index) => {
                    if(e > 0){
                        return(
                            <div key={index+character_keys[index].name}>
                                {character_keys[index].name}
                            </div>
                        )
                    }
                })}
            </div>
            <div>
                {playerInfo?.playerRes.matches.map((e, index) => {
                    return(
                        <div key={e.date1.toString()}>
                            {e.p1_name}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default PlayerDetails;