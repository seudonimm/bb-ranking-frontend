import {useState, useEffect} from 'react';
import "./Ranking.scss";
import type { RankingObject } from '../types/RankingTypes';
import RankingBox from '../components/RankingBox';
import RankingBoxFirst from '../components/RankingBoxFirst';

const Ranking:React.FC = () => {
    let rankCounter = 0;

    const [rankings, setRankings] = useState<RankingObject[]>([]);

    const getRankings = async() => {
        try {
            const res = await fetch('http://18.219.55.213:5000/');
            const resJson = await res.json();
            console.log(resJson);
            setRankings(resJson);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        console.log(rankings);
    }, [rankings]);

    useEffect(() => {
        getRankings();
    }, []);

    return(
        <div>
            <table className={"Ranking"}>
                <tbody>
                    {rankings.map((e) =>{
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
                </tbody>
            </table>
        </div>
    );
};

export default Ranking;

