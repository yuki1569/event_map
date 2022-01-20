import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// import Post from "../../src/Type/Post";

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

// type Props = Post & {
//   imageUrl: string;
//   href: string;
// };

const EventListItem = ({
  link,
  longitudeLatitude,
  thumbnail,
  title,
  key,
  distance,
  changeMapCenter,
  setselectedButtonId,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div
        onClick={() => {
          changeMapCenter({
            lat: Number(longitudeLatitude[0]),
            lng: Number(longitudeLatitude[1]),
          });
          setselectedButtonId(title);
        }}
      >
        {/* <Link href={link}> */}
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={thumbnail}
            title={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {distance}km
            </Typography>
          </CardContent>
        </CardActionArea>
        {/* </Link> */}
      </div>
    </Card>
  );
};

export default EventListItem;
