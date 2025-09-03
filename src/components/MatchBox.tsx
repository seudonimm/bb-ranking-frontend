
import { Link } from "@tanstack/react-router";
import { character_keys } from "../CharacterKeys";
import './RankingBox.scss'
import './MatchBox.scss'

interface Props {
    // match:Match
    name:string;
    char:number;
    steamID:string;
    winner:boolean
}
const MatchBox:React.FC<Props> = (props) => {

    const {name, char, steamID, winner} = props;

    return(
        <div className={winner?"character-match-box-winner":"character-match-box-loser"}>
            <Link 
                to="/player/$steamID"
                params={{steamID:steamID}}
            >
                {name}
            </Link>
            <img className="image"
                alt="character icon"
                src={character_keys[char].icon_url}
            />
        </div>
    );
};

export default MatchBox