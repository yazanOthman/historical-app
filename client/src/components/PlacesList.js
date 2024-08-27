import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Container,
  Chip,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const PlacesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { places, loading, error, placesVisted } = useSelector(
    (state) => state.places
  );
  const [isRandom, setIsRandom] = useState(false);

  useEffect(() => {
    if (!isRandom) {
      dispatch({ type: "FETCH_PLACES_REQUEST" });
    } else {
      dispatch({ type: "FETCH_RANDOM_PLACES_REQUEST" });
    }
  }, [dispatch, placesVisted, isRandom]);

  const handleRandomPlaces = () => {
    setIsRandom(true);
    dispatch({ type: "FETCH_RANDOM_PLACES_REQUEST" });
  };
  const handleToggleVisited = (id, visited) => {
    dispatch({
      type: "UPDATE_PLACE_VISITED",
      payload: { id, visited: !visited },
    });
  };

  const navigateToPlace = (id) => {
    navigate(`/place/${id}`);
  };

  if (loading)
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Container>
    );
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <div style={{ marginTop: "2rem", overflowAnchor: "none" }}>
      <Typography variant="h2" gutterBottom align="center">
        {isRandom ? "Random Historical Wonders" : "Explore Historical Wonders"}
      </Typography>
      <Typography variant="h5" gutterBottom align="center">
        Discover the rich history and cultural significance of these remarkable
        landmarks.
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2, p: 6 }}>
        {places.map((place) => (
          <Grid item key={Math.random()} xs={12} sm={6} md={4}>
            <StyledCard>
              <CardMedia
                component="img"
                height="200"
                image={place.image || "placeholder.jpg"}
                alt={place.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {place.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {place.information.substring(0, 100)}...
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between", mt: "auto" }}>
                <Button onClick={() => navigateToPlace(place._id)} size="small">
                  View Details
                </Button>
                <Chip
                  icon={
                    place.visited ? (
                      <CheckCircleIcon />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )
                  }
                  label={place.visited ? "Visited" : "Not Visited"}
                  onClick={() => handleToggleVisited(place._id, place.visited)}
                  color={place.visited ? "primary" : "default"}
                  clickable
                />
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleRandomPlaces}
          sx={{ mx: 6, my: 2, p: 2 }}
        >
          Generate Random Places
        </Button>{" "}
        {isRandom && (
          <Button
            variant="contained"
            color="success"
            onClick={() => setIsRandom(false)}
            sx={{ mx: 6, my: 2, p: 2 }}
          >
            Get Original Places
          </Button>
        )}
      </div>
    </div>
  );
};

export default PlacesList;
