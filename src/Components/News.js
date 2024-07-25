import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Loader from './Loader'
import Select from 'react-select'
import InfiniteScroll from 'react-infinite-scroll-component'

const options = [
  { value: 'in', label: 'India' },
  { value: 'ae', label: 'United Arab Emirates' },
  { value: 'ar', label: 'Argentina' },
  { value: 'at', label: 'Austria' },
  { value: 'au', label: 'Australia' },
  { value: 'be', label: 'Belgium' },
  { value: 'bg', label: 'Bulgaria' },
  { value: 'br', label: 'Brazil' },
  { value: 'ca', label: 'Canada' },
  { value: 'ch', label: 'Switzerland' },
  { value: 'cn', label: 'China' },
  { value: 'co', label: 'Colombia' },
  { value: 'cu', label: 'Cuba' },
  { value: 'cz', label: 'Czechia' },
  { value: 'de', label: 'Germany' },
  { value: 'eg', label: 'Egypt' },
  { value: 'fr', label: 'France' },
  { value: 'gb', label: 'United Kingdom of Great Britain and Northern Ireland (the)' },
  { value: 'gr', label: 'Greece' },
  { value: 'hk', label: 'Hong Kong' },
  { value: 'hu', label: 'Hungary' },
  { value: 'id', label: 'Indonesia' },
  { value: 'ie', label: 'Ireland' },
  { value: 'il', label: 'Israel' },
  { value: 'it', label: 'Italy' },
  { value: 'jp', label: 'Japan' },
  { value: 'kr', label: 'Korea (the Republic of)' },
  { value: 'lt', label: 'Lithuania' },
  { value: 'lv', label: 'Latvia' },
  { value: 'ma', label: 'Morocco' },
  { value: 'mx', label: 'Mexico' },
  { value: 'my', label: 'Malaysia' },
  { value: 'ng', label: 'Nigeria' },
  { value: 'nl', label: 'Netherlands (the)' },
  { value: 'no', label: 'Norway' },
  { value: 'nz', label: 'New Zealand' },
  { value: 'ph', label: 'Philippines (the)' },
  { value: 'pl', label: 'Poland' },
  { value: 'pt', label: 'Portugal' },
  { value: 'ro', label: 'Romania' },
  { value: 'rs', label: 'Serbia' },
  { value: 'ru', label: 'Russian Federation (the)' },
  { value: 'sa', label: 'Saudi Arabia' },
  { value: 'se', label: 'Sweden' },
  { value: 'sg', label: 'Singapore' },
  { value: 'si', label: 'Slovenia' },
  { value: 'sk', label: 'Slovakia' },
  { value: 'th', label: 'Thailand' },
  { value: 'tr', label: 'Turkey' },
  { value: 'tw', label: 'Taiwan (Province of China)' },
  { value: 'ua', label: 'United Arab Emirates (the)' },
  { value: 'us', label: 'United States of America (the)' },
  { value: 've', label: 'Venezuela (Bolivarian Republic of)' },
  { value: 'za', label: 'South Africa' }
];

export class News extends Component {

  static defaultProps = {
    pageSize: 11,
    category: 'general',
  }

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      country: 'in',
      fetchedPages: {},
      search: ''
    }
    document.title = "News : " + this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)

  }

  async componentDidMount() {
    this.props.setProgress(20);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.state.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(40);
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false, fetchedPages: { 1: true } });
    this.props.setProgress(100);
  }

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    if (!this.state.fetchedPages[nextPage]) {
      this.setState({ loading: true });
      let url = `https://newsapi.org/v2/top-headlines?country=${this.state.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
      this.props.setProgress(40);
      let data = await fetch(url);
      this.props.setProgress(50);
      let parsedData = await data.json();
      this.props.setProgress(70);
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading: false,
        page: nextPage,
        fetchedPages: { ...this.state.fetchedPages, [nextPage]: true },
      });
      this.props.setProgress(100);
    }
  };

  handleChange = (country) => {
    this.setState({ country: country.value, page: this.state.page, articles: [] }, () => {
      this.componentDidMount();
    });
  };

  render() {
    const { country } = this.state;
    return (
      <div className="container-fluid my-5">

        <h1 className="text-center mb-5">Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h1>
        
        <div className="container mt-5 mb-3 d-flex justify-content-center">
          <div className="search-container row w-100 ms-5 rounded-2 ">
            <i className="bi bi-search col-md-1 fs-5 d-flex justify-content-center align-items-center rounded-2 border-0"></i>
            <input type="search" onChange={(e) => this.setState({ search: e.target.value })} className="form-control col w-50 rounded-2 ms-0 search border-0" placeholder="Search News" />
          </div>
          <Select value={{ value: country, label: options.find((option) => option.value === country).label }} onChange={this.handleChange} options={options} className="col-md-3 ms-5 w-25" />
        </div>

        {this.state.loading && <Loader />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loader />}>

          <div className="container">
            <div className="row">
              {this.state.articles.filter((element) => {
                if (!element.title && !element.description) return false;
                return this.state.search.toLowerCase() === '' ? element :
                  (element.title && element.title.toLowerCase().includes(this.state.search.toLowerCase())) ||
                  (element.description && element.description.toLowerCase().includes(this.state.search.toLowerCase()));
              }).map((element, index) => {
                const key = `${element.title}-${element.publishedAt}-${index}`;
                return <div className="card-group col-md-4" key={key}>
                  <NewsItem title={element.title ? element.title.slice(0, 60).concat("...") : ""} description={element.description ? element.description.slice(0, 200).concat("...") : ""} imgUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                </div>
              })}
            </div>

          </div>

        </InfiniteScroll>

      </div>
    )
  }
}

export default News
