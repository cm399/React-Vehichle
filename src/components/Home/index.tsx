import { Card, CardActionArea, CardContent, CardMedia, Container, Stack, Typography } from "@mui/material";
import { FC } from "react";
import "./index.scss";
import { getCars } from './../../mock/index';
import { useNavigate } from "react-router-dom";

const Home: FC = () => {

  const carsData = getCars(),
    navigate = useNavigate();

  return (
    <Container>
      <h1 className="rv__title">Select your model</h1>
      <div className="rv__vehicle_list">
        <Stack direction="row" spacing={5} justifyContent="center">
          {carsData.map((_c) => (
            <Card key={_c.id} sx={{ maxWidth: 345 }} onClick={() => navigate(`/build/${_c.id}`)}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="150"
                  image={_c.img}
                  alt={_c.name}
                />
                <CardContent>
                  <Typography className="rv__vehicle_name" gutterBottom variant="h5" component="div">
                    {_c.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {_c.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </div>
    </Container>
  );
};

export default Home;