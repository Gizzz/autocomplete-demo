import * as React from 'react';
import ReactStars from 'react-stars';

interface IResultEntryProps {
  entry: any;
}

const ResultEntry = ({ entry }: IResultEntryProps) => {
  return (
    <li className="search-results__items__item">
        <div className="search-results__items__item__image">
          <img src={entry.icon} />
        </div>
        <div className="search-results__items__item__info">
          <h4>{entry.name}</h4>
          <div className="search-results__rating">
            {
              entry.rating
                ? <ReactStars count={5} value={entry.rating} size={24} edit={false} />
                : <p>Rating is not available.</p>
            }
          </div>
          {
            entry.opening_hours && entry.opening_hours.open_now
              ? <div className="search-results__badge">Open Now</div>
              : null
          }
          <a
            className="search-results__gmaps-link"
            // tslint:disable-next-line:max-line-length
            href={`https://www.google.ru/maps/place/${encodeURIComponent(entry.name)}/@${entry.geometry.location.lat},${entry.geometry.location.lng},21z`}
            target="blank"
          >
            Show on Google Maps
          </a>
        </div>
      </li>
  );
};

export default ResultEntry;
