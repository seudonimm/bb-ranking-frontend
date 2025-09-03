import './Header.scss';

interface Props {
    text:string
}

const Header:React.FC<Props> = (props) => {
    const {text} = props
    return(
        <div className='Header'>{text}</div>
    )
}

export default Header;