import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";

const DragAndDrop = (props) => {
  const { usagerChoisi, ordinateurs } = props;

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
    padding: grid * 2,
    margin: `${grid * 1.2}px 0`,
    height: grid * 2.6,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "darkgray",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightgray" : "",
    padding: grid,
  });

  const formaterEtat = (usagerChoisi, ordinateurs) => {
    var newEtat = [];
    newEtat.push([]);
    if (
      usagerChoisi.appareilsAffectes !== null &&
      usagerChoisi.appareilsAffectes !== undefined
    ) {
      usagerChoisi.appareilsAffectes.map((appareil, indUsager) => {
        appareil.id = `item-${Math.floor(Math.random() * 900000000)}`;
        appareil.title = `${appareil._id}`;
        newEtat[0].push(appareil);
      });
    }
    newEtat.push([]);
    ordinateurs.map((ordinateur, indOrdinateur) => {
      ordinateur.id = `item-${Math.floor(Math.random() * 900000000)}`;
      ordinateur.title = `${ordinateur.serialNumber} - ${ordinateur.marque} ${ordinateur.modele}`;
      newEtat[1].push(ordinateur);
    });
    console.log("newEtat -----");
    console.log(newEtat);

    return newEtat;
  };

  const [etat, setEtat] = useState(formaterEtat(usagerChoisi, ordinateurs));

  const reorder = (liste, startIndex, endIndex) => {
    const result = [...liste];
    const [dragged] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, dragged);

    return result;
  };

  const move = (listeSource, listeDest, source, destination) => {
    const sourceClone = Array.from(listeSource);
    const destClone = Array.from(listeDest);
    if (destination.droppableId === 0) {
      const newItem = source;
      newItem.id = `item-${Math.floor(Math.random() * 900000000)}`;
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
      newEtat[dInd].map((item, indItem) => {
        if (Object.keys(item).length === 0) {
          newEtat[dInd].splice(indItem, 1);
        }
      });
      setEtat(newEtat);
    }
  }

  const nomColonne = (index) => {
    let nom = "Vide";
    switch (index) {
      case 0:
        if (usagerChoisi.nom === undefined || usagerChoisi.prenom === undefined)
          nom = "Aucun usager choisi";
        else nom = usagerChoisi.nom + " " + usagerChoisi.prenom;
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

  const sauvegarderSoirée = async (listeAppareils) => {
    let appareilsAffectes = { ordinateurs: [] };
    appareilsAffectes.ordinateurs = listeAppareils;
    notifySaveSuccess();
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
            <Droppable key={indColonne} droppableId={`${indColonne}`}>
              {(provided, snapshot) => (
                <Box
                  sx={{ borderRadius: 1 }}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  <Typography
                    variant="h6"
                    textAlign="center"
                    key={indColonne}
                    width={225}
                  >
                    {nomColonne(indColonne)}
                  </Typography>
                  {colonne.map((item, indItem) => (
                    <Draggable
                      key={indItem}
                      draggableId={item.id}
                      index={indItem}
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
                              alignItems: "center",
                              height: "5vh",
                            }}
                          >
                            <Typography
                              textAlign="center"
                              key={indItem + item.id}
                            >
                              {item.title}
                            </Typography>
                            <Box textAlign="center">
                              <Typography variant="subtitle2">
                                {item.processeur}
                              </Typography>
                              <Grid container spacing={2} display="flex">
                                <Grid item xs={6}>
                                  <Typography variant="subtitle2">
                                    {item.memoire} Go
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="subtitle2">
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
