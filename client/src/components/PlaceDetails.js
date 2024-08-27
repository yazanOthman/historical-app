import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  Paper,
  Chip,
  Container,
  Box,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PlaceDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentPlace, loading, error } = useSelector((state) => state.places);

  useEffect(() => {
    dispatch({ type: "FETCH_PLACE_DETAILS_REQUEST", payload: id });
  }, [dispatch, id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!currentPlace) return null;

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Paper
        sx={{
          height: 300,
          backgroundImage: `url(${currentPlace.image})`, // Replace with your image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
          padding: 2,
          color: "white",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {currentPlace.name}
        </Typography>
      </Paper>
      <Box sx={{ paddingY: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              About {currentPlace.name}
              <Chip
                label={currentPlace.visited ? "Visited" : "Not Visited"}
                color={currentPlace.visited ? "primary" : "default"}
                sx={{ m: 2 }}
              />
            </Typography>
            <Typography variant="body1" paragraph>
              {currentPlace.name} is {currentPlace.information}
            </Typography>
          </Grid>
          <Button
            LinkComponent={"a"}
            href="/"
            sx={{ m: 2 }}
            startIcon={<ArrowBackIcon />}
          >
            back
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default PlaceDetails;
