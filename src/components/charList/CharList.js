import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false
        })
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(this.onListLoaded)
            .catch(this.onError)
    }

    renderItems(arr) {
        const items = arr.map(item => {
            let imgStyle = this.marvelService.setImgStyle(item.thumbnail);

            return (
                <li className="char__item" key={item.id}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }


    render() {
        const { charList, loading, error } = this.state;
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list" >
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;