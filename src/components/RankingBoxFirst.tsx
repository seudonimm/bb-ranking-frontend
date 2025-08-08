import "./RankingBox.scss";
import type { RankingObject } from "../types/RankingTypes";
import { character_keys } from "../CharacterKeys";

interface Props{
    rank:RankingObject
    rankCounter:number
}

const RankingBoxFirst:React.FC<Props> = (props) => {
    const {rank, rankCounter} = props;

    return(
        <div className="Ranking-Box-First">
            <div>{rankCounter}</div>
            <div className="name">{rank.name}</div>
            <div>{rank.ranking.rankScore.toFixed(2) + "+-" + rank.ranking.deviation.toFixed(2)}</div>
            <div className="big-character">
                <img className="big-image"
                    alt={character_keys[`${rank.character_id}`].name}
                    src={character_keys[`${rank.character_id}`].full_body_url}
                />
            </div>
        </div>

    );
}

export default RankingBoxFirst;