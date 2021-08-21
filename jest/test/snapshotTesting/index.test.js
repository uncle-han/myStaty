import {
    config,
    otherConfig
} from './index'

test('test config by snapshot', () => {
    expect(config()).toMatchSnapshot()
})

// test('test otherConfig by snapshot', () => {
//     expect(otherConfig()).toMatchSnapshot()
// })

