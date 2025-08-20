import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask } from "./slices/task.slice.jsx";
import { v4 as uuid } from "uuid";
import "./styles/TaskManager.css";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BasicModal } from "./components/modal.jsx";
import { GoClock } from "react-icons/go";
import { FaCircle } from "react-icons/fa";

export function App() {
  const inputData = useRef();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.tarea);
  const hoy = new Date();
  const [input, setInput] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    fechaAlta: "",
    estado: "pendiente",
  });

  function handleChange(e) {
    setInput({
      ...input,
      id: uuid(),
      [e.target.name]: e.target.value,
      fechaAlta: hoy.toLocaleDateString("es-AR"),
    });
  }

  function handleSubmit() {
    if (inputData.current.value !== "") {
      dispatch(addTask(input));
      console.log(input);
    }
  }

  function handleDelete(e) {
    dispatch(deleteTask(e.id));
  }
  function handleSubmitdown(e) {
    if (e.key === "Enter") {
      handleSubmit();
      e.target.value = "";
    }
  }

  return (
    <div className="conteiner-taskmanager">
      <div className="card-add">
        <input
          ref={inputData}
          name="nombre"
          type="text"
          style={{
            width: "200px",
            border: "none",
            color: "black",
            fontSize: "20px",
          }}
          onKeyDown={handleSubmitdown}
          onChange={handleChange}
          placeholder="Agregue un nombre de Tarea"
        />
        <IoMdAddCircleOutline onClick={handleSubmit} className="buttonadd" />
      </div>
      <div className="conteiner-tareas">
        {selector == "" ? (
          <h4>no hay tareas</h4>
        ) : (
          selector.map((e) => {
            return (
              <div key={e.id} className={`card-tarea`}>
                <div className="card-header">
                  <span className={`card-titulo`}>{e.nombre}</span>
                  <div className="card-body">
                    <GoClock />
                    <span>{e.fechaAlta}</span>
                    {e.estado == "pendiente" ? (
                      <>
                        <FaCircle color="yellow" />
                        <span>{e.estado}</span>
                      </>
                    ) : e.estado == "enproceso" ? (
                      <>
                        <FaCircle color="orange" />
                        <span>{e.estado}</span>
                      </>
                    ) : (
                     <>
                        <FaCircle color="green" />
                        <span>{e.estado}</span>
                      </>
                    )}
                    <div className="contenedor-botones">
                      <BasicModal id={e} />
                      <MdDeleteOutline onClick={() => handleDelete(e)} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
