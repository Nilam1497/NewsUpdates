import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    console.log("Hello I am a constructor");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
    };
  }

  async componentDidMount() {
    // let url =
    //   "https://newsapi.org/v2/top-headlines?country=in&apiKey=b44480710b1941508959e284f4e862fb&page=1";
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=b44480710b1941508959e284f4e862fb&page=1";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles });
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=b44480710b1941508959e284f4e862fb&page=${
      this.state.page - 1
    }`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };
  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=b44480710b1941508959e284f4e862fb&page=${
      this.state.page + 1
    }`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
    });
  };

  render() {
    return (
      <>
        <div className="container my-3"></div>
        <h2>Top Headlines</h2>

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  key={element.url}
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            class="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            class="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </>
    );
  }
}

export default News;
