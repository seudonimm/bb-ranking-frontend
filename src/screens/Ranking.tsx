import {useState, useEffect} from 'react';
import "./Ranking.scss";
import type { RankingObject } from '../types/RankingTypes';
import RankingBox from '../components/RankingBox';
import RankingBoxFirst from '../components/RankingBoxFirst';
import { character_keys } from '../CharacterKeys';

const Ranking:React.FC = () => {
    let rankCounter = 0;

    const [rankings, setRankings] = useState<RankingObject[]>([]);
    const [filteredRankings, setFilteredRankings] = useState<RankingObject[]>([]);

    const getRankings = async() => {
        try {
            const res = await fetch('https://bbranking.duckdns.org/');
            const resJson = await res.json();
            console.log(resJson);
            setRankings(resJson);
        } catch (e) {
            console.log(e);
        }
    };

    const handleCharacterSelect = (char:string) => {
        if(char == ""){
            setFilteredRankings(rankings);
        }else{
            setFilteredRankings(rankings.filter((e) => {
                return e.character_id == Number(char)
            }))

        }
    }

    useEffect(() => {
        console.log(rankings);
        setFilteredRankings(rankings);
    }, [rankings]);

    useEffect(() => {
        getRankings();
    }, []);

    return(
        <div>
            <div className='instructions'>
                <div>
                    How To Join
                </div>
                <div>
                    To join the rankings you first need to have the BBCF Improvement Mod which you can find <a href='https://github.com/libreofficecalc/BBCF-Improvement-Mod'>here</a>. Once you've 
                    followed the instructions to install the mod, go into the settings.ini file and add the following 
                    to a new line: <code>UploadReplayDataHost = 18.219.55.213</code> then save and close the file. After doing this make sure the replay 
                    upload in the mod is enabled and in your bbcf settings in the Network Options, Saving Replays 
                    for Ranked, Player, and Lobby Match should be set to Allow. After that whenever you fight someone 
                    else who is also participating in this ranking, results and ratings should be automatically uploaded 
                    and calculated.
                </div>
            </div>
            <label>
                Character: <select
                    onChange={e => handleCharacterSelect(e.target.value)}
                >
                    <option key={"empty"} value={""}>{"All"}</option>
                    {
                        character_keys.map((e, index) => {
                            return(
                                <option key={index.toString()} value={index}>{e.name}</option>
                            )
                        })
                    }
                </select>
            </label>
            <div className={"Ranking"}>
                {filteredRankings.length > 0?<div>
                    {filteredRankings.map((e) =>{
                        if(e.matches.length != 0){
                            rankCounter += 1;
                            return(
                               rankCounter==1?
                               <RankingBoxFirst key={e.steamID}
                                    rank={e}
                                    rankCounter={rankCounter}
                                />:
                                <RankingBox key={e.steamID}
                                    rank={e}
                                    rankCounter={rankCounter}
                                />
                            )
                        }
                    })} 
                </div>:
                <div>No rankings for this character</div>
                }
            </div>
        </div>
    );
};

export default Ranking;

