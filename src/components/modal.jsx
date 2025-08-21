import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MdEdit } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { display, flexDirection, flexWrap, height } from "@mui/system";
import "../styles/modal.css";
import { editTask } from "../slices/task.slice";
import { useState, useRef } from "react";

const style = {
  display:"flex",
  flexWrap:"wrap",
  flexDirection:"column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export function BasicModal(e) {
  const Textarea = useRef();
  const selector = useSelector((state) => state.tarea);
  const found = selector.find((select) => select.id == e.id.id);
  const [data, setData] = useState({
    fechaAlta: "",
    descripcion: "",
    estado: "",
    id: "",
    nombre: "",
  });

  const id = data.id;
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleOpen = (id) => {
    setOpen(true);
    setData({
      fechaAlta: found.fechaAlta,
      descripcion: found.descripcion,
      estado: found.estado,
      id: found.id,
      nombre: found.nombre,
    });
  };
  const handleClose = () => setOpen(false);

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleGuardar() {
    dispatch(editTask(data));
    console.log(data);
    handleClose();
  }

  function handlerTextarea(e) {
    e.target.style.height = e.target.scrollHeight + "px";
  }
  return (
    <div>
      <MdEdit onClick={() => handleOpen(id)} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="task-edit">
            <h3>Fecha de Alta : {data.fechaAlta}</h3>
            <div className="task-nombre">
              <label htmlFor="">Tarea</label>
              <input
                name="nombre"
                type="text"
                defaultValue={data.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="task-descripcion">
              <label htmlFor="">Descripcion</label>
              <textarea
                name="descripcion"
                type="text"
                defaultValue={data.descripcion}
                onChange={handleChange}
                onInput={handlerTextarea}
              />
            </div>

            <div className="task-estado">
              <h4>Estado</h4>
              <div>
                <div>
                  <input
                    name="estado"
                    id="1"
                    type="radio"
                    onChange={handleChange}
                    checked={data.estado == "pendiente"}
                    value={"pendiente"}
                  />
                  <label htmlFor="1">Pendiente</label>
                </div>
                <div>
                  <input
                    name="estado"
                    id="2"
                    type="radio"
                    onChange={handleChange}
                    checked={data.estado == "enproceso"}
                    value={"enproceso"}
                  />
                  <label htmlFor="2">En proceso</label>
                </div>
                <div>
                  <input
                    name="estado"
                    id="3"
                    type="radio"
                    onChange={handleChange}
                    checked={data.estado == "procesado"}
                    value={"procesado"}
                  />
                  <label htmlFor="3">Procesado</label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button onClick={handleClose} style={{ marginRight: "10px" }}>
              Close
            </button>
            <button onClick={handleGuardar}>Guardar</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
