import React, { PureComponent } from 'react';

// Если хотим глубоко сравнивать объекты, то устанавливаем пакет lodash
// npm i --save lodash.isequal
// Т.к. через строки (JSON.stringify) не будет работать сравнение для функций и вложенных объектов
// Ну либо пишем собственную реализацию рекурсивного обхода и сравнивания свойств объектов исходя из своих данных
// Еще можно по очереди сравнивать каждое свойство, нууууу оно такое конечно, хотя на практике чаще применяется =)

// Первый вариант плюсы: быстрее в разработке, более глубокое сравнение, надежнее, т.к. уже оттестирован, многим разработчикам знаком, оптимизирован.
// Первый вариант минусы: вес бандла

// Второй вариант плюсы: вес бандла, можно подогнать под свои данные (размерность объектов), возможно увеличит скорость
// Второй вариант минусы: долго разрабатывать, тестировать, оптимизировать, погружаться новому разработчику тяжелее
const _ = require('lodash');

type IUser = {
    name: string
    age: number
}

type IProps = {
    user: IUser
}

/**
 * Специальная обертка для проверки необходимости апдейта компонента при апдейте пропсов
 *
 * @param propsOne - Первый пропс
 * @param propsTwo - Второй пропс
 */
function needUpdateByProps<T>(propsOne: T, propsTwo: T): boolean {
    return !(_.isEqual(propsOne, propsTwo));
}

// functional component
const ComponentOne = React.memo(({ name, age }: IUser) => {
    return (
    <div>
        my name is {name}, my age is {age}
    </div>
)});

const FirstComponent = React.memo(ComponentOne, needUpdateByProps);

// functional component
const ComponentTwo = ({ user: { name, age } }: IProps) => {
    return (
    <div>
        my name is {name}, my age is {age}
    </div>
)};

const SecondComponent = React.memo(ComponentTwo, needUpdateByProps);

// class component
class ThirdComponent extends PureComponent<IUser> {
    shouldComponentUpdate(nextProps: IUser): boolean {
        return needUpdateByProps<IUser>(nextProps, this.props)
    }

    render() {
        return (
            <div>
                my name is {this.props.name}, my age is {this.props.age}
            </div>
        )
    }
}

// class component
class FourthComponent extends PureComponent<IProps> {
    shouldComponentUpdate(nextProps: IProps): boolean {
        return needUpdateByProps<IProps>(nextProps, this.props)
    }

    render() {
        return (
            <div>
                my name is {this.props.user.name}, my age is {this.props.user.age}
            </div>
        )
    }
}
