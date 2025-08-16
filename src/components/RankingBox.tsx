import "./RankingBox.scss";
import type { RankingObject } from "../types/RankingTypes";
import { character_keys } from "../CharacterKeys";

import { Link } from "@tanstack/react-router";

interface Props{
    rank:RankingObject
    rankCounter:number
}

const RankingBox:React.FC<Props> = (props) => {
    const {rank, rankCounter} = props;

    return(
        <div className={rankCounter==1?"Ranking-Box-First":"Ranking-Box"}>
            <div>{rankCounter}</div>
            <div className="rank-and-char">
                <Link className="name"
                    to="/player/$steamID"
                    params={{steamID:rank.steamID}}
                    resetScroll={false}
                >
                    {rank.name}
                </Link>
                <div className="rank">
                    <div>
                        Rating: {rank.ranking.rankScore.toFixed(2) + " ±" + rank.ranking.deviation.toFixed(2)}
                    </div>
                    <div>
                        Wins: {rank.wins} Losses: {rank.losses}
                    </div>
                </div>
                <div className={rankCounter==1?"big-character":"character"}>
                    <img className="image"
                        loading="lazy"
                        alt={character_keys[`${rank.character_id}`].name}
                        src={rankCounter==1?
                            character_keys[`${rank.character_id}`].full_body_url:
                            character_keys[`${rank.character_id}`].icon_url
                        }
                    />
                </div>
            </div>
        </div>

    );
}

export default RankingBox;