import './SubHeader.scss';

interface Props {
    text:string
}

const SubHeader:React.FC<Props> = (props) => {
    const {text} = props
    return(
        <div className='SubHeader'>{text}</div>
    )
}

export default SubHeader;