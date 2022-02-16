import type { IScriptSnapshot } from 'typescript'
import React, { Component } from 'react';
import Styled from 'styled-components';

import { Button, Input, ToDoItem } from 'Components';

const Container = Styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Contents = Styled.div`
  display: flex;
  background-color: #FFFFFF;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;
const InputContainer = Styled.div`
  display: flex; 
`;

const ToDoListContainer = Styled.div`
  min-width: 350px;
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #BDBDBD;
  margin-bottom: 20px;
`;

interface Props {
  id: string;
  value: string;
}

interface State {
  readonly id: string;
  readonly toDo: string;
  readonly toDoList: string[];
  readonly error: boolean;
}

class App extends Component<Props, State> {
  constructor(props:Props) {
    super(props);

    this.state = {
      id: '',
      toDo: '',
      toDoList: [],
      error: false,
    }
  }

  private addToDo = (): void => {
    const {toDo, toDoList} = this.state;
    if (toDo) {
      this.setState({
        toDo: '',
        toDoList: [...toDoList, toDo],
      })
    }
  };

  private deleteToDo = (index: number): void => {
    let list = [...this.state.toDoList];
    list.splice(index, 1);
    this.setState({
      toDoList: list,
    })
  };

  render() {
    const {toDo, toDoList, error} = this.state;

    return (
        <Container>
          {!error && (
              <Contents>
                  <ToDoListContainer data-testid='toDoList'>
                    {toDoList.map((item, index) => (
                        <ToDoItem key={item} label={item} onDelete={() => this.deleteToDo(index)}/>
                    ))}
                  </ToDoListContainer>
                  <InputContainer>
                      <Input placeholder="할 일을 입력해 주세요" onChange={(text) => this.setState({toDo: text})}/>
                      <Button label="추가" onClick={this.addToDo}/>
                  </InputContainer>
              </Contents>
          )}
        </Container>
    );
  }

  // 부모로부터 받은 Props와 State를 동기화할 때 사용
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    console.log('getDerivedStateFromProps');

    if (nextProps.id !== prevState.id) {
      return {value: nextProps.value};
    }
    // 동기화할 State가 없으면 null 반환
    return null;
  }

  // 클래스 컴포넌트가 처음으로 화면에 표시된 이후에 호출 (render 함수 처음 한 번 호출된 후)
  componentDidMount() {
    console.log('componentDidMount');
    // ajax를 통한 데이터 습득이나 다른 자바스크립트 라이브러리와의 연동을 수행할 때 주로 사용
  }

  // Props 또는 State가 변경되어 화면을 다시 그리기 위해 render 함수가 호출된 후 화면이 갱신되기 전에 이 함수가 호출된다.
  // 화면을 갱신하는 동안 수동으로 스크롤 위치를 고정해야 하는 경우 등에 사용
  getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
    console.log('getSnapshotBeforeUpdate');

    return {
      testData: true,
    };
  }

  // Props 또는 State가 변경되어 화면이 갱신될 때마다 render 함수가 호출된 후 실행
  // 수동으로 스크롤 위치를 고정해야 하는 경우 getSnapshotBeforeUpdate와 함께 활용
  componentDidUpdate(prevProps: Props, prevState: State, snapshot: IScriptSnapshot) {
    console.log('componentDidUpdate');
  }

  // 부모 컴포넌트로 전달받은 Props가 변경되거나 컴포넌트 내부에서 this.setState로 State를 변경하면 리렌더링 되어 화면을 다시 그리게 된다.
  // 다시 화면을 그리고 싶지 않으면 이 함수를 사용하여 렌더링을 제어할 수 있다. return false : 리렌더링 수행 방지.
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    console.log('shouldComponentUpdate');
    return nextProps.id !== this.props.id;
  }

  // 해당 컴포넌트가 화면에서 완전히 사라진 후 호출됨.
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  // render 함수의 JSX에서 발생하는 에러를 예외처리 할 수 있게 도와주는 함수
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({
      error: true,
    });
  }
}
export default App;
