import crowd from "../images/crowd.jpg";

export const searchBox = {
  height: ["200px", "300px"],
  width: ["90%", , , "75%", "60%"],
  background: "#fff",
  position: "absolute",
  top: ["200px", "400px"],
  boxShadow: "10px 16px 11px rgba(0, 0, 0, 0.26)",
  borderRadius: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const searchBoxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const backgroundCrowd = {
  height: ["280px", "500px"],
  width: "100%",
  background: `no-repeat center/130% url(${crowd})`,
};

export const categories_styles = {
  background: "rgb(100, 67, 238)",
  cursor: "pointer",
  borderTopRightRadius: "20px",
  borderTopLeftRadius: "20px",
  textAlign: "center",
  width: "70%",
  margin: "auto",
  height: "25%",
  fontWeight: "bold",
  "&:hover": {
    color: "#fff",
    backgroundColor: "rgb(55, 48, 107)",
    transition: "all .5s ease-in-out",
  },
};

export const dicscover_style = {
  display: "flex",
  alignItems: "center",
  mt: ["140px", "300px"],
};

export const typoStyle = {
  fontWeight: "bold",
  fontSize: ["1.5rem", "2rem", "2.5rem"],
  mt: "30px",
};

export const upcoming_style = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  fontWeight: "bold",
  m: "30px 0 0",
  fontSize: ["1.5rem", "2rem", "2.5rem"],
};

export const GridFilterEventStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "auto 0 50px",
  padding: "40px 0",
  width: ["95%"],
};
