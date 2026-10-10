import '../../styles/header.css'

export default function Header({current}) {
    return(
        <div className="sbHeader">
            <div className="header">
                JBR Empire
            </div>
            <div className="currentPage">
                <h3>{current}</h3>
            </div>
        </div>
    )
}