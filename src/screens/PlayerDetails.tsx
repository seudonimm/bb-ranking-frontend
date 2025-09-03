import { useState, useEffect, useCallback } from "react";
import type { RankingObject, Match } from "../types/RankingTypes";
import './PlayerDetails.scss';

import { character_keys } from "../CharacterKeys";
import RankingBox from "../components/RankingBox";
import MatchBox from "../components/MatchBox";
import { useQuery } from "@tanstack/react-query";
import { RingLoader } from "react-spinners";
import { Link } from "@tanstack/react-router";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";

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

    const [mostPlayedCharacter, setMostPlayedCharacter] = useState<number>(0);
    const [matches, setMatches] = useState<Match[]>();

    const getDetails = async():Promise<PlayerInfoType> => {
        const res = await fetch(`https://bbranking.duckdns.org/player/${steamID}`);
        return await res.json();

    }

    const {data:playerInfo, isPending, error} = useQuery({
        queryKey:[steamID],
        queryFn: getDetails
    });

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
        getMostPlayedCharacter();
        if(playerInfo?.playerRes.matches){
            setMatches(playerInfo.playerRes.matches.reverse());
        }

    }, [playerInfo]);

    useEffect(() => {
        console.log(error);
    }, [error]);

    return(
        <div>
            <Link
                to={'/'}
            >
                Back to Rankings
            </Link>
            <Header
                text={playerInfo?.playerRes.names[0]?playerInfo?.playerRes.names[0]:""}
            />
            <div className="name-and-char">
                {/* <div>
                    {playerInfo?.playerRes.names[0]}
                </div> */}
                {!isPending?<img className="char-image"
                    alt="most-played-character-image"
                    src={character_keys[mostPlayedCharacter].full_body_url}
                />:
                <RingLoader/>
                }
            </div>
            <SubHeader
                text="Characters Played"
            />
            <div>
                {playerInfo?.playerRankRes.map((e, index) => {
                    return(
                        <div className="char-info"
                            key={index+e.character_id}
                        >
                            <RankingBox rank={e}/>
                        </div>
                    )
                })}
            </div>
            <SubHeader
                text="Recent Matches"
            />
            <div>
                {matches?.map((e, index) => {
                    return(
                        <div className="match"
                            key={e.date1.toString()+index}
                        >
                            <MatchBox name={e.p1_name} char={e.p1_toon} steamID={e.p1_steamid64} winner={e.winner==0}/>
                            {/* <a href={`http://50.118.225.175/uploads/${e.filename}`} target="_blank">Download Replay</a> */}
                            <div>
                                <div>{new Date(e.date1).toLocaleDateString()}</div>
                                <div>{new Date(e.date1).toLocaleTimeString()}</div>
                            </div>
                            <MatchBox name={e.p2_name} char={e.p2_toon} steamID={e.p2_steamid64} winner={e.winner==1}/>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default PlayerDetails;