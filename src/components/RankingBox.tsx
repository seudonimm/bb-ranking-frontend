import "./RankingBox.scss";
import type { RankingObject } from "../types/RankingTypes";
import { character_keys } from "../CharacterKeys";

interface Props{
    rank:RankingObject
    rankCounter:number
}

const RankingBox:React.FC<Props> = (props) => {
    const {rank, rankCounter} = props;

    return(
        <div className="Ranking-Box">
            <div>{rankCounter}</div>
            <div className="rank-and-char">
                <div className="name">{rank.name}</div>
                <div className="rank">
                    <div>
                        Rating: {rank.ranking.rankScore.toFixed(2) + " ±" + rank.ranking.deviation.toFixed(2)}
                    </div>
                    <div>
                        Wins: {rank.wins} Losses: {rank.losses}
                    </div>
                </div>
                <div className="character">
                    <img className="image"
                        alt={character_keys[`${rank.character_id}`].name}
                        src={character_keys[`${rank.character_id}`].icon_url}
                    />
                </div>
            </div>
        </div>

    );
}

export default RankingBox;