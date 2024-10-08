import {View, Text, TextInput, Pressable, Alert} from 'react-native';
import React, {useState} from 'react';

const TodoList = () => {
  const [title, setTitle] = useState<string>('');
  const [todo, setTodo] = useState<any[]>([
    {
      id: 1,
      title: 'Learn React',
      completed: false,
    },
  ]);
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddTodo = () => {
    if (!title) {
      Alert.alert('Error', 'Please enter your todo');
      return;
    }

    if (editId !== null) {
      const updatedTodos = todo.map(item =>
        item.id === editId ? {...item, title} : item,
      );
      setTodo(updatedTodos);
      setEditId(null);
    } else {
      const newTodo = {
        id: todo.length + 1,
        title: title,
        completed: false,
      };
      setTodo([...todo, newTodo]);
    }

    setTitle('');
  };

  const handleEditTodo = (id: number) => {
    const todoToEdit = todo.find(item => item.id === id);
    if (todoToEdit) {
      setTitle(todoToEdit.title);
      setEditId(id);
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodo(todo.filter(item => item.id !== id));
    if (editId === id) {
      setEditId(null);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
          gap: 10,
        }}>
        <TextInput
          placeholder="Enter your todo"
          style={{
            flex: 1,
            borderColor: 'black',
            borderWidth: 1,
            padding: 10,
          }}
          value={title}
          onChangeText={setTitle}
        />
        <Pressable
          style={{
            backgroundColor: editId !== null ? 'orange' : 'blue', // Ubah warna saat dalam mode edit
            padding: 10,
            borderRadius: 5,
            height: 40,
          }}
          onPress={handleAddTodo}>
          <Text style={{color: 'white'}}>
            {editId !== null ? 'Edit Todo' : 'Add Todo'}
          </Text>
        </Pressable>
      </View>

      {todo.map(item => (
        <View
          key={item.id}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: 'black',
          }}>
          <Text style={{fontSize: 18, color: 'black'}}>{item.title}</Text>

          <View style={{flexDirection: 'row', gap: 10}}>
            <Pressable
              style={{
                backgroundColor: 'green',
                padding: 5,
                borderRadius: 5,
              }}
              onPress={() => handleEditTodo(item.id)}>
              <Text style={{color: 'white'}}>Edit</Text>
            </Pressable>

            <Pressable
              style={{
                backgroundColor: 'red',
                padding: 5,
                borderRadius: 5,
              }}
              onPress={() => handleDeleteTodo(item.id)}>
              <Text style={{color: 'white'}}>Delete</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};

export default TodoList;
