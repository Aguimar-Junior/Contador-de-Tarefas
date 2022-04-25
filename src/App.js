import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {

  const [tarefas, setTarefas] = useState([]);

  const [input, setInput] = useState('')

  const hendleAdd = useCallback(() =>{
    setTarefas([...tarefas, input])
    setInput('');
  },[input, tarefas])

  const totalTarefas = useMemo(()=> tarefas.length, [tarefas]);

  useEffect(()=> {
    const tarefasStorage = localStorage.getItem('tarefas');
    if(tarefasStorage){
      setTarefas(JSON.parse(tarefasStorage))
    }

  }, []);

  useEffect(()=>{
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  

  return (
    <div>
      <ul>
        {tarefas.map(tarefa =>(
          <li key={tarefa}>{tarefa}</li>
        ))}
      </ul>
      <strong>Você tem {totalTarefas} tarefas</strong>
      <br/>
      <input type='text' value={input} onChange={e => setInput (e.target.value)}/>
      <button type='button' onClick={hendleAdd}>Adicionar</button>
    </div>
  );
}

export default App;
