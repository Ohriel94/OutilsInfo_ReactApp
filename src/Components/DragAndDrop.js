import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Typography, Button, Paper, Box } from "@mui/material";
import { toast } from "react-toastify";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const DragAndDrop = (props) => {
  const { usagers, setUsagers, ordinateurs, setOrdinateurs } = props;
  const [contextMenu, setContextMenu] = useState(null);
  const [boutonCourant, setBoutonCourant] = useState("");
  const [nouveauJeu, setNouveauJeu] = useState({ nom: null });

  useEffect(() => {}, []);

  const grid = 8;

  const commonStyles = {
    bgcolor: "background.paper",
    borderColor: "text.primary",
    background: "#0C7DF2",
    border: 0,
    width: "8rem",
    height: "2rem",
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `${grid * 2}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "darkgray",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "gray" : "",
    padding: grid,
  });

  const formaterJeuxPossibles = (partie) => {
    // partie.map((tour, indTour) => {
    //   tour.map((jeu, indJeu) => {
    //     let jeuFormater = {
    //       id: `jeu-${Math.floor(Math.random() * 900000000)}`,
    //       nom: jeu.nom,
    //     };
    //     partie[indTour].splice(indJeu, 1, jeuFormater);
    //   });
    // });
    // return partie;
  };

  const [etatPartie, setEtatPartie] = useState(formaterJeuxPossibles());

  const reorder = (liste, startIndex, endIndex) => {
    const result = [...liste];
    const [dragged] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, dragged);

    return result;
  };

  const move = (listeSource, listeDest, itemSource, itemDest, idSource) => {
    // const sourceClone = Array.from(listeSource);
    // const destClone = Array.from(listeDest);
    // if (idSource === 0) {
    //   const newItem = {
    //     id: `jeu-${Math.floor(Math.random() * 900000000)}`,
    //     nom: listeSource[itemSource.index].nom,
    //   };
    //   destClone.splice(itemDest.index, 0, newItem);
    // } else {
    //   const [removed] = sourceClone.splice(itemSource.index, 1);
    //   destClone.splice(itemDest.index, 0, removed);
    // }
    // const result = [];
    // result[itemSource.droppableId] = sourceClone;
    // result[itemDest.droppableId] = destClone;
    // result.map((tour) => {
    //   if (tour === {}) result.splice(indJeu, 1);
    // });
    // return result;
  };

  function onDragEnd(result) {
    // const { source, destination } = result;
    // // dropped outside the list
    // if (!destination) {
    //   return;
    // }
    // const sInd = +source.droppableId;
    // const dInd = +destination.droppableId;
    // if (dInd != 0) {
    //   if (sInd === dInd) {
    //     const items = reorder(
    //       etatPartie[sInd],
    //       source.index,
    //       destination.index
    //     );
    //     const newEtatPartie = [...etatPartie];
    //     etatPartie.map((tour, indTour) => {
    //       if (indTour < 0) {
    //         tour.map((jeu, indJeu) => {
    //           newEtatPartie[indTour].push({ id: indJeu, nom: jeu });
    //         });
    //       }
    //     });
    //     newEtatPartie[dInd] = items;
    //     setEtatPartie(newEtatPartie);
    //   } else {
    //     const result = move(
    //       etatPartie[sInd],
    //       etatPartie[dInd],
    //       source,
    //       destination,
    //       sInd
    //     );
    //     const newEtatPartie = [...etatPartie];
    //     newEtatPartie[sInd] = result[sInd];
    //     newEtatPartie[dInd] = result[dInd];
    //     newEtatPartie[dInd].map((jeu, indJeu) => {
    //       if (Object.keys(jeu).length === 0) {
    //         newEtatPartie[dInd].splice(indJeu, 1);
    //       }
    //     });
    //     setEtatPartie(newEtatPartie);
    //   }
    // }
  }

  const nomColonne = (index) => {
    // let nom = "Empty";
    // index === 0 ? (nom = "Listes des Jeux") : (nom = "Tour " + index);
    // return nom;
  };

  const notifySaveSuccess = () =>
    toast.success("Sauvegarde réussie...", {
      toastId: "save-in-progress",
    });
  const notifySuppressionSuccess = () =>
    toast.success("Jeu supprimé...", {
      toastId: "suppression-reussi",
    });
  const notifySuppressionImpossible = () =>
    toast.error("Ce jeu ne peux pas être supprimer...", {
      toastId: "suppression-impossible",
    });

  const sauvegarderSoirée = async () => {
    // let soireeASauvegader = { tours: [] };
    // etatPartie.map((tour, colonne) => {
    //   let listeJeux = [];
    //   if (colonne > 0) {
    //     tour.map((jeu) => {
    //       listeJeux.push(jeu.nom);
    //     });
    //     soireeASauvegader.tours.push({ jeux: listeJeux });
    //   }
    // });
    // await PartieDomaine.modifierPartie(soireeASauvegader);
    // let anciennePartie = [];
    // anciennePartie.push([]);
    // nomJeux.map((jeu, i) => {
    //   anciennePartie[0].push({ id: i, nom: jeu.nom });
    // });
    // if (soireeASauvegader !== undefined) {
    //   soireeASauvegader.tours.map((tour, i) => {
    //     anciennePartie.push([]);
    //     tour.jeux.map((jeu, j) => {
    //       anciennePartie[i + 1].push({ id: j, nom: jeu });
    //     });
    //   });
    // }
    // setPartie(formaterJeuxPossibles(anciennePartie));
    // notifySaveSuccess();
  };

  return (
    <div className="DragDropComponent">
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          type="button"
          variant="contained"
          sx={{ margin: "1vh" }}
          onClick={() => {
            setEtatPartie([...etatPartie, []]);
          }}
        >
          Ajouter un nouveau tour
        </Button>
        <Button
          type="button"
          variant="contained"
          sx={{ margin: "1vh" }}
          disabled={etatPartie.length < 2}
          onClick={() => {
            let newEtatPartie = [...etatPartie];
            newEtatPartie.pop();
            setEtatPartie([...newEtatPartie]);
          }}
        >
          Retirer le dernier tour
        </Button>
        <Button
          type="button"
          variant="contained"
          sx={{ margin: "1vh" }}
          onClick={() => sauvegarderSoirée(etatPartie)}
          disabled={etatPartie.length < 2 || etatPartie[1].length < 1}
        >
          Sauvegarder la soirée
        </Button>
      </div>
      <br />
      <br />
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {/* {etatPartie.map((tour, indTour) => (
            <Droppable key={nomColonne(indTour)} droppableId={`${indTour}`}>
              {(provided, snapshot) => (
                <Box
                  sx={{ borderRadius: 2 }}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  <Typography variant="h6" textAlign="center" key={indTour}>
                    {nomColonne(indTour)}
                  </Typography>
                  {tour.map((jeu, indJeu) => (
                    <Draggable key={jeu.id} draggableId={jeu.id} index={indJeu}>
                      {(provided, snapshot) => (
                        <Paper
                          onContextMenu={() => {
                            setBoutonCourant([indTour, indJeu]);
                            handleContextMenu();
                          }}
                          elevation={9}
                          sx={{ ...commonStyles, borderRadius: 2 }}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "2vh",
                            }}
                          >
                            <Typography
                              textAlign="center"
                              key={indJeu + jeu.id}
                            >
                              {jeu.nom}
                            </Typography>
                          </div>
                        </Paper>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          ))} */}
        </DragDropContext>
      </div>
    </div>
  );
};

export default DragAndDrop;
