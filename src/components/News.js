import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";


export default class News extends Component {
    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1
          };
    }

async componentDidMount(){
       let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&pageSize=${this.props.pageSize}&page=1&apiKey=b2caedacaa4f424c93757543875e591b`;
       this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData); 
        this.setState({articles:parsedData.articles,
          totalResults:parsedData.totalResults,
          loading:false
        })
    }

    handlePreviousClick = async()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page -1}&apiKey=b2caedacaa4f424c93757543875e591b`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles:parsedData.articles,
           page:this.state.page -1,
           loading:false
        })    
      }

    handleNextClick = async()=>{
        console.log("clicked");
        if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page +1}&apiKey=b2caedacaa4f424c93757543875e591b`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles:parsedData.articles,
           page:this.state.page +1,
           loading:false
        })  
      }
      }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Top Headlines of NewsPanda</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((article, index) => {
            return (
              <div className="col-md-4" key={index}>
                <NewsItems
                  title={article.title}
                  description={article.description}
                  image={article.urlToImage}
                  url={article.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page <=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr;Previous</button>
        <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
        </div>
      </div>
    );
  }
}
