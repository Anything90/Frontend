import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function Cards({ title, content }) {
  return (
    <Card style={{ minWidth: 200, margin: 12 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Cards;
