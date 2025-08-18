import {useState, useEffect} from 'react';
import "./Ranking.scss";
import type { RankingObject } from '../types/RankingTypes';
import RankingBox from '../components/RankingBox';
import RankingBoxFirst from '../components/RankingBoxFirst';
import { character_keys } from '../CharacterKeys';

import {ClipLoader} from 'react-spinners';

import { 
    useQuery,
} from '@tanstack/react-query';

const Ranking:React.FC = () => {
    let rankCounter = 0;

    const [filteredRankings, setFilteredRankings] = useState<RankingObject[]>([]);
    const [currChar, setCurrChar] = useState<number>(0);
    const getRankings = async():Promise<RankingObject[]> => {
        const res = await fetch('https://bbranking.duckdns.org/');
        return res.json();
    };

    const {isPending, isError, error, data:rankings} = useQuery({
        queryKey: ['ranks'],
        queryFn: getRankings
    })

    const handleCharacterSelect = (char:string) => {
        if(char == "" && rankings){
            setFilteredRankings(rankings);
        }else if (rankings){
            setCurrChar(Number(char));
            setFilteredRankings(rankings.filter((e) => {
                return e.character_id == Number(char)
            }));
        }
    }

    useEffect(() => {
        console.log(rankings);
        if(rankings){
            setFilteredRankings(rankings);
        }
    }, [rankings]);

    useEffect(() => {
        if(isError){
            console.log(error);
        }
    }, [error]);
    
    return(
        <div>
            <div className='instructions'>
                <div>
                    How To Join
                </div>
                <div>
                    **UPDATE**
                    <br/>
                    To join the rankings you now only need to 
                    <ul>
                        <li>
                            Install this modified version of the BBCF Improvement Mod which you can find <a href='https://github.com/seudonimm/BBCF-Improvement-Mod/releases/tag/v.1.0.0'>here</a>
                        </li>
                        <li>
                            Make sure the replay upload in the mod is enabled
                        </li>
                        <li>
                            In your BBCF game settings, in the Network Options, make sure Saving Replays for Ranked, Player, and Lobby Match are all set to Allow.
                        </li>
                    </ul>
                    After that whenever you fight someone else who is also participating in this ranking, results and ratings should be automatically uploaded and calculated.
                    <br/> 
                    If you previously changed the settings.ini file to include <code>UploadReplayDataHost = 18.219.55.213</code> you can remove or change this line back if you want to be able to toggle the ranking on or off.
                    <br/> 
                    Rankings were previously not updating due to an error, they should be working now
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
                                <option key={index.toString()+e.name} value={index}>{e.name}</option>
                            )
                        })
                    }
                </select>
            </label>
            <div className={"Ranking"}>
                <ClipLoader
                    color='gray'
                    loading={isPending}
                    size={50}
                />
                {filteredRankings.length > 0?<div>
                    {filteredRankings.map((e) =>{
                        // if(e.matches.length != 0){
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
                    //}
                    )} 
                </div>:
                <div>
                    <div>No rankings for this character</div>
                    <img
                        src={character_keys[currChar].full_body_url}
                    />
                </div>
                }
            </div>
        </div>
    );
};

export default Ranking;

