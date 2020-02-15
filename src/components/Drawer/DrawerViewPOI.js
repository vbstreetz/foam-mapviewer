import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Chip } from '@material-ui/core';
import xhr from 'utils/xhr';
import Geohash from 'latlon-geohash';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 0,
  },
  title: {
    marginBottom: 10,
    fontSize: 13,
    fontWeight: 'bolder',
  },
  listItem: {
    padding: 0,
  },
  paper: {
    marginBottom: 10,
    padding: '10px 10px 0',
  },
  chip: {
    marginBottom: 5,
    marginRight: 5,
  },
}));

const Component = ({
  match: {
    params: { url, listingHash },
  },
  showDrawer,
}) => {
  const classes = useStyles();
  const [
    { name, address, status, description, phone, web, geohash, tags = [] },
    setPOI,
  ] = React.useState({});

  const onMount = async() => {
    const poi = (await xhr('get', `/poi/${listingHash}`)).data.data;
    setPOI(poi);
  };

  React.useEffect(
    () => {
      onMount();
      showDrawer(url);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [listingHash]
  );

  const { lon, lat } = !geohash ? {} : Geohash.decode(geohash);

  const info = [
    !name ? null : ['Name', name],
    !address ? null : ['Address', address],
    !status ? null : ['Status', status],
    !phone ? null : ['Phone', phone],
    !web ? null : ['Website', web],
    !geohash
      ? null
      : [
          'Location',
          <div>
            Longitude: {lon}
            <br />
            Latitude: {lat}
          </div>,
        ],
    !tags.length
      ? null
      : [
          'Tags',
          tags.map(tag => (
            <Chip
              key={tag}
              label={tag}
              color="default"
              className={classes.chip}
            />
          )),
        ],
    !description ? null : ['Description', description],
  ].filter(x => !!x);

  return (
    <div>
      <h4 className="drawer--title">Point of Interest</h4>
      <div className="drawer--content">
        {info.map(([k, v]) => (
          <div key={k} elevation={0} className={classes.paper}>
            <Typography variant="h6" className={classes.title}>
              {k}
            </Typography>

            <div>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default connect((state, { match: { params: { listingHash } } }) => {
  return {};
}, mapDispatchToProps)(Component);