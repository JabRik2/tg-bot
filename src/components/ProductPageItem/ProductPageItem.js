import { useEffect, useState } from "react";
import AddButton from "../AddButton/AddButton";
import './productPageItem.css';

const ProductPageItem = ({ title, price, descr, value, id, img }) => {
    const [html, setHtml] = useState('');

    useEffect(() => {
        const html = descr.replace(/(?:\r\n|\r|\n)/g, '<br>');
        console.log(html);
        setHtml(html);
    }, [descr])

    return (
        <>
            <section className="mobile-gallery">
                <img src={img} alt={title} />
            </section>
            <section className="description">
                <h1>{title}</h1>
                <p dangerouslySetInnerHTML={{__html: html}} className="desc"/>
                <div className="price">
                    <div className="main-tag">
                        <p>{price} ₽</p>
                    </div>
                </div>
                <div className="buttons">
                    <AddButton id={id} value={value} price={price} />
                </div>
            </section>
        </>
    );
};

export default ProductPageItem;