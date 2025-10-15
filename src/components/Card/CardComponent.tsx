import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useResidents } from "../../hooks/useResidents";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

// type CardComponentProps = {
//   headline: string;
// };

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function CardComponent(props) {
  const [expanded, setExpanded] = React.useState(true); //when user clicks expand

  const { title, subtitle, climate, expandedItems, clickableItems } = props;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          <p onClick={handleExpandClick}> {title} </p>
          {subtitle}
        </Typography>
      </CardContent>

      {/* <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions> */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>
            {climate}
            {clickableItems}
            {expandedItems}
          </Typography>
        </CardContent>
      </Collapse>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>
            'character info here '{" "}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
