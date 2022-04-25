import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Typography, Button, Paper, Box } from "@mui/material";
import { toast } from "react-toastify";

const DragAndDrop = (props) => {
  const { usagers, ordinateurs } = props;

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

  const formaterEtat = (usagers, ordinateurs) => {
    var newEtat = [];
    newEtat.push([]);
    usagers.map((usager, indUsager) => {
      usager.id = `item-${Math.floor(Math.random() * 900000000)}`;
      usager.title = `${usager.prenom} ${usager.nom}`;
      newEtat[0].push(usager);
    });
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

  const [etat, setEtat] = useState(formaterEtat(usagers, ordinateurs));

  const reorder = (liste, startIndex, endIndex) => {
    const result = [...liste];
    const [dragged] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, dragged);

    return result;
  };

  const move = (listeSource, listeDest, itemSource, itemDest, idSource) => {
    const sourceClone = Array.from(listeSource);
    const destClone = Array.from(listeDest);
    if (idSource === 0) {
      const newItem = {
        id: `item-${Math.floor(Math.random() * 900000000)}`,
        title: `${itemSource.prenom} ${itemSource.nom}`,
        prenom: itemSource.prenom,
        nom: itemSource.nom,
        _id: itemSource._id,
      };
      destClone.splice(itemDest.index, 0, newItem);
    } else {
      const [removed] = sourceClone.splice(itemSource.index, 1);
      destClone.splice(itemDest.index, 0, removed);
    }
    const result = [];
    result[itemSource.droppableId] = sourceClone;
    result[itemDest.droppableId] = destClone;
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
    if (dInd != 0) {
      if (sInd === dInd) {
        const items = reorder(etat[sInd], source.index, destination.index);
        const newEtat = [...etat];
        etat.map((tour, indTour) => {
          if (indTour < 0) {
            tour.map((item, indItem) => {
              newEtat[indTour].push({ id: indItem, nom: item });
            });
          }
        });
        newEtat[dInd] = items;
        setEtat(newEtat);
      } else {
        const result = move(etat[sInd], etat[dInd], source, destination, sInd);
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
  }

  const nomColonne = (index) => {
    let nom = "Vide";
    switch (index) {
      case 0:
        nom = "Listes des usagers";
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

  const sauvegarderSoirée = async () => {
    let soireeASauvegader = { tours: [] };
    // etat.map((tour, colonne) => {
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
    // setPartie(formaterEtat(anciennePartie));
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
          onClick={() => sauvegarderSoirée(etat)}
          disabled={etat.length < 2 || etat[1].length < 1}
        >
          Sauvegarder la soirée
        </Button>
      </div>
      <br />
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {etat.map((colonne, indColonne) => (
            <Droppable key={indColonne} droppableId={`${indColonne}`}>
              {(provided, snapshot) => (
                <Box
                  sx={{ borderRadius: 2 }}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  <Typography variant="h6" textAlign="center" key={indColonne}>
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
                              key={indItem + item.id}
                            >
                              {item.title}
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
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default DragAndDrop;
