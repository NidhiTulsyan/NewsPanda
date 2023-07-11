import React,{Component} from 'react';

export default class NewsItems extends Component{
    render(){
        let {title,description,image,url} = this.props;
        let defaultImage = "https://kstp.com/wp-content/uploads/2023/03/tap-water-us-air-force-mgn.jpg"
        return (
            <div>
                    <div className="card my-2" >
                        <img src={!image?defaultImage:image} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <a href={url} className="btn sm btn-dark">Read Morey</a>
                        </div>
                    </div>
            </div>
        )
    }
}
//b2caedacaa4f424c93757543875e591b