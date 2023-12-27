import React, { useEffect, useState } from 'react';
import styled from "styled-components";

function ToDo() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Buy 1kg Tomato",
        },
        {
            id: 2,
            title: "Buy 2kg Onion",
        },
        {
            id: 3,
            title: "Visit Friend",
        },
        {
            id: 4,
            title: "Clean House",
        },
    ]);
    const [completed, setCompleted] = useState([
        {
            id: 5,
            title: "Washing Clothes",
        },
        {
            id: 6,
            title: "Play Cricket",
        },
        {
            id: 7,
            title: "1km Walking",
        },
        {
            id: 8,
            title: "Do Homework",
        },
    ]);

    const [newTask, setNewTask] = useState([""]);
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        setItemCount(completed.length + tasks.length);
    }, []);

    const completeTask= (id) => {
        let current_task = tasks.find((task) => task.id == id);
        setCompleted([...completed, current_task]);
        
        let new_list = tasks.filter((task) => task.id !== id);
        setTasks(new_list);
    }
    const revertTask= (id) => {
        let current_task = completed.find((task) => task.id == id);
        setTasks([...tasks, current_task]);
        
        let new_list = completed.filter((task) => task.id !== id);
        setCompleted(new_list);
    }

    const renderTasks = () => {
        return tasks.map((task) => (
            <List>
                <LeftContainer onClick={()=>completeTask(task.id)}>
                    <ItemCheck></ItemCheck>
                    <ItemContent>{task.id}, {task.title}</ItemContent>
                </LeftContainer>
                <RightContainer>
                    <ActionButton onClick={()=>deleteTask(task.id)}>
                        <BtnImg src={require("./assets/delete.svg").default} alt="Delete" />
                    </ActionButton>
                </RightContainer>
            </List>
        ));
    };
    const renderCompleted = () => {
        return completed.map((task) => (
            <List>
                <LeftContainer>
                    <ItemCheckCompleted>
                        <TickImg src={require("./assets/tick-green.svg").default} alt="Tick" />
                    </ItemCheckCompleted>
                    <ItemCompletedContent>{task.id}, {task.title}</ItemCompletedContent>
                </LeftContainer>
                <RightContainer>
                    <ActionButton onClick={()=>revertTask(task.id)}>
                        <BtnImg src={require("./assets/revert.svg").default} alt="Revert"/>
                    </ActionButton>
                    <ActionButton onClick={()=>deleteCompleted(task.id)}>
                        <BtnImg src={require("./assets/delete.svg").default} alt="Delete"/>
                    </ActionButton>
                </RightContainer>
            </List>
        ));
    };

    const addNewTask = (e) => {
        e.preventDefault();
        let new_task = {
            id: itemCount + 1,
            title: newTask,
        }
        setTasks([...tasks, new_task]);
        setNewTask("");
        setItemCount((prev) => prev + 1);
    }
    const deleteTask = (id) => {
        let new_list = tasks.filter((task) => task.id !== id);
        setTasks(new_list);
    }
    const deleteCompleted = (id) => {
        let new_list = completed.filter((task) => task.id !== id);
        setCompleted(new_list);
    }
  return (
    <Container>
        <Heading>Todo List</Heading>
        <ToDoContainer>
            <SubHeading>Things to be done</SubHeading>
            <ToDoList>{renderTasks()}</ToDoList>
        </ToDoContainer>

        <AddToDoForm>
            <Input value={newTask} onChange={(e)=>setNewTask(e.target.value)} placeholder="Type new task..." />
            <AddButton onClick={(e) => addNewTask(e)}>Add New</AddButton>
        </AddToDoForm>

        <ToDoContainer>
            <SubHeading>Completed</SubHeading>
            <ToDoList>{renderCompleted()}</ToDoList>
        </ToDoContainer>
    </Container>
  );
}
export default ToDo;

const Container = styled.div`
    width: 90% auto;
    max-width: 900px;
    padding: 20px 11%;
    margin: 0 auto;
    border-left: 2px solid #f5f5f5;
    border-right: 2px solid #f5f5f5;
`;
const Heading = styled.h1`
    font-size: 45px;
    font-weight: bold;
    text-align: center;
`;
const ToDoContainer = styled.div``;
const SubHeading = styled.h3`
    font-size: 35px;
    color: #050241;
    margin-bottom: 5px;
`;
const ToDoList = styled.ul``;
const List = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const LeftContainer = styled.div`
    display: flex;
    align-items: center;
`;
const ItemCheck = styled.span`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid #050241;
    margin-right: 15px;
    display: inline-block;
    cursor: pointer;
`;
const ItemContent = styled.span`
    font-size: 25px;
    cursor: pointer;
`;
const RightContainer = styled.div``;
const ActionButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    margin-right: 20px;
    &:last-child{
        margin-right: 0;
    }
`;
const BtnImg = styled.img``;
const AddToDoForm = styled.form`
    display: flex;
    margin-left: 40px;
    margin-top: 30px;
    position: relative;
    &::before{
        content: '';
        position: absolute;
        background: url(${require("./assets/plus.svg").default});
        width: 16px;
        height: 16px;
        display: block;
        left: 10px;
        top: 0;
        bottom: 0;
        margin: auto 0;
        z-index: 2;
    }
`;
const Input = styled.input`
    display: block;
    width: 100%;
    outline: none;
    border: 1px solid #c6c6c6;
    border-right: none;
    padding: 0 10px 0 35px;
    font-size: 18px;
`;
const AddButton = styled.button`
    padding: 14px 25px;
    white-space: nowrap;
    border: none;
    background: #050241;
    color: #fff;
    cursor: pointer;
    border-radius: 6px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    font-size: 22px;
`;
const ItemCheckCompleted = styled(ItemCheck)`
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: #06c692;
`;
const ItemCompletedContent = styled(ItemContent)`
    color: #06c692;
`;
const TickImg = styled.img``;