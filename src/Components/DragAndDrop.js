import React, { useState, useEffect } from "react";
import Axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";

const DragAndDrop = (props) => {
  const { usagerChoisi, ordinateurs, refreshState } = props;

  const affecterAppareil = (usagerChoisi) => {
    const f = async () => {
      try {
        const updateUserRequest = await Axios({
          method: "post",
          url: "http://localhost:3001/affectation",
          data: usagerChoisi,
        });
      } catch (e) {
        console.log("Failed to connect " + e);
      }
    };
    f();
  };

  const grid = 10;

  const commonStyles = {
    bgcolor: "background.paper",
    borderColor: "text.primary",
    background: "#0C7DF2",
    border: 0,
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: `${grid * 1.2}px`,
    margin: `0 0 ${grid * 0.9}px 0`,
    width: `${grid * 25}px`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "darkgray",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightgray" : "",
    padding: grid,
  });

  const formaterEtat = (appareilsAffectes, ordinateurs) => {
    var newEtat = [];
    newEtat.push([]);
    if (appareilsAffectes !== undefined) {
      if (appareilsAffectes !== []) {
        console.log("appareils usager");
        appareilsAffectes.map((appareil, indAppareil) => {
          appareil.title = `${appareil.serialNumber} - ${appareil.marque} ${appareil.modele}`;
          newEtat[0].push(appareil);
          console.log(indAppareil + " - " + appareil.id);
        });
      }
    }
    newEtat.push([]);
    console.log("ordinateurs");
    ordinateurs.map((ordinateur, indOrdinateur) => {
      if (ordinateur.etatDisponible === true) {
        ordinateur.title = `${ordinateur.serialNumber} - ${ordinateur.marque} ${ordinateur.modele}`;
        newEtat[1].push(ordinateur);
        console.log(indOrdinateur + " - " + ordinateur.id);
      }
    });

    return newEtat;
  };

  const [etat, setEtat] = useState(
    formaterEtat(usagerChoisi.appareilsAffectes, ordinateurs)
  );

  React.useEffect(() => {
    console.log("UseEffect");
    formaterEtat(...etat);
    console.log(etat);
    console.log(refreshState);
  }, [refreshState]);

  const reorder = (liste, startIndex, endIndex) => {
    const result = [...liste];
    const [dragged] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, dragged);
    return result;
  };

  const move = (listeSource, listeDest, source, destination) => {
    const sourceClone = [...listeSource];
    const destClone = [...listeDest];

    if (source.droppableId === 0) {
      const newItem = listeSource[source.index];
      destClone.splice(destination.index, 0, newItem);
    } else {
      const [removed] = sourceClone.splice(source.index, 1);
      destClone.splice(destination.index, 0, removed);
    }

    const result = [];
    result[source.droppableId] = sourceClone;
    result[destination.droppableId] = destClone;
    result.map((tour, indItem) => {
      if (tour === {}) result.splice(indItem, 1);
    });
    return result;
  };

  function onDragEnd(result) {
    const { source, destination } = result;
    console.log(result);
    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    if (sInd === dInd) {
      const items = reorder(etat[sInd], source.index, destination.index);
      const newEtat = [...etat];
      etat.map((colonne, indColonne) => {
        if (indColonne < 0) {
          colonne.map((item, indItem) => {
            newEtat[indColonne].push(item);
          });
        }
      });
      newEtat[dInd] = items;
      setEtat(newEtat);
    } else {
      const result = move(etat[sInd], etat[dInd], source, destination);
      const newEtat = [...etat];
      newEtat[sInd] = result[sInd];
      newEtat[dInd] = result[dInd];
      setEtat(newEtat);
    }
  }

  const nomColonne = (index) => {
    let nom = "Vide";
    switch (index) {
      case 0:
        if (usagerChoisi.prenom === undefined || usagerChoisi.nom === undefined)
          nom = "Aucun usager choisi";
        else nom = usagerChoisi.prenom + " " + usagerChoisi.nom;
        break;
      case 1:
        nom = "Ordinateurs";
        break;
      case 2:
        nom = "Telephones";
        break;
      default:
        nom = "Autres";
        break;
    }
    return nom;
  };

  const notifySaveSuccess = () => {
    toast.success("Affectation réussie...", {
      toastId: "save-in-progress",
    });
  };
  const notifySuppressionSuccess = () =>
    toast.success("Jeu supprimé...", {
      toastId: "suppression-reussi",
    });
  const notifySuppressionImpossible = () =>
    toast.error("Ce jeu ne peux pas être supprimer...", {
      toastId: "suppression-impossible",
    });

  const sauvegarderSoirée = async (listeAppareils) => {
    console.log("sauvegarderSoirée");
    usagerChoisi.appareilsAffectes = listeAppareils;
    console.log(usagerChoisi);
    affecterAppareil(usagerChoisi);
    notifySaveSuccess();
  };

  return (
    <div className="DragDropComponent">
      <br />
      <div
        style={{
          margin: "0px 10px",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <Button
          type="button"
          variant="contained"
          onClick={() => sauvegarderSoirée(etat[0])}
          disabled={etat.length < 2 || etat[1].length < 1}
        >
          Sauvegarder l'affectation
        </Button>
      </div>
      <br />
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {etat.map((colonne, indColonne) => (
            <Droppable
              key={indColonne}
              droppableId={`${indColonne}`}
              id={indColonne}
            >
              {(provided, snapshot) => (
                <Box
                  sx={{
                    borderRadius: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  <Typography
                    variant="h6"
                    textAlign="center"
                    key={nomColonne(indColonne)}
                    width={"auto"}
                  >
                    {nomColonne(indColonne)}
                  </Typography>
                  {colonne.map((item, indItem) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={indItem}
                      padding={15}
                    >
                      {(provided, snapshot) => (
                        <Paper
                          elevation={3}
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
                              textAlign: "center",
                              height: "6vh",
                            }}
                          >
                            <Typography key={"TITL-" + item.id} variant="h6">
                              {item.title}
                            </Typography>
                            <Box>
                              <Typography
                                key={"PROC-" + item.id}
                                variant="subtitle2"
                              >
                                {item.processeur}
                              </Typography>
                              <Grid container display="flex">
                                <Grid item xs={6}>
                                  <Typography
                                    key={"MEMO-" + item.id}
                                    variant="subtitle2"
                                  >
                                    {item.memoire} Go
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography
                                    key={"DISQ-" + item.id}
                                    variant="subtitle2"
                                  >
                                    {item.disque} Go
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                          </div>
                        </Paper>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default DragAndDrop;
