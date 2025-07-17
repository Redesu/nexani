import { Fab } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";


export const Arrow = ({ direction, handleClick }: { direction: string, handleClick: () => void }) => {
    return (
        <Fab
            style={{
                padding: "2em",
                backgroundColor: "unset",
                boxShadow: "unset",
                border: "1px solid"
            }}
            onClick={handleClick}
        >
            {direction === "left" ? <ArrowBackIos /> : <ArrowForwardIos />}
        </Fab>
    )
}
