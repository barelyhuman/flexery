import test from 'ava'

import { modsToStyle } from '../src/lib/mods-to-style.js'

test('Flex Prop | Single', t => {
  const props = {
    flex: true,
  }

  const expected = {
    display: 'flex',
  }

  const { style } = modsToStyle(props, 'px')

  for (const key of Object.keys(expected)) {
    t.true(Object.prototype.hasOwnProperty.call(style, key))
    t.deepEqual(style[key], expected[key])
  }
})

test('Flex + Alignment Props', t => {
  const props = {
    flex: true,
    justTop: true,
    alignCenter: true,
  }

  const expected = {
    display: 'flex',
    justifyContent: 'top',
    alignItems: 'center',
  }

  const { style } = modsToStyle(props, 'px')

  for (const key of Object.keys(expected)) {
    t.true(Object.prototype.hasOwnProperty.call(style, key))
    t.deepEqual(style[key], expected[key])
  }
})

test('Center Props | Singler', t => {
  const props = {
    flex: true,
    center: true,
  }

  const expected = {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  }

  const { style } = modsToStyle(props, 'px')

  for (const key of Object.keys(expected)) {
    t.true(Object.prototype.hasOwnProperty.call(style, key))
    t.deepEqual(style[key], expected[key])
  }
})

test('Center Props | Multiple', t => {
  const props = {
    flex: true,
    centerX: true,
    centerY: true,
  }

  const expected = {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  }

  const { style } = modsToStyle(props, 'px')

  for (const key of Object.keys(expected)) {
    t.true(Object.prototype.hasOwnProperty.call(style, key))
    t.deepEqual(style[key], expected[key])
  }
})

test('Direction Alignments | All', t => {
  const props = {
    flex: true,
    alignTop: true,
    alignBottom: true,
    alignStart: true,
    alignEnd: true,
  }

  const expected = {
    display: 'flex',
    alignItems: 'flex-end',
  }

  const { style } = modsToStyle(props, 'px')

  for (const key of Object.keys(expected)) {
    t.true(Object.prototype.hasOwnProperty.call(style, key))
    t.deepEqual(style[key], expected[key])
  }
})

test('Flex One', t => {
  const props = {
    'flex': true,
    'flex-1': true,
  }

  const expected = {
    display: 'flex',
    flex: '1',
  }

  const { style } = modsToStyle(props, 'px')

  for (const key of Object.keys(expected)) {
    t.true(Object.prototype.hasOwnProperty.call(style, key))
    t.deepEqual(style[key], expected[key])
  }
})

test('Flex 10', t => {
  const props = {
    'flex': true,
    'flex-10': true,
  }

  const expected = {
    display: 'flex',
    flex: '10',
  }

  const { style } = modsToStyle(props, 'px')

  for (const key of Object.keys(expected)) {
    t.true(Object.prototype.hasOwnProperty.call(style, key))
    t.deepEqual(style[key], expected[key])
  }
})

test('Justify Distributed Alignment', t => {
  const testSet = [
    {
      props: {
        justBetween: true,
      },
      expected: {
        justifyContent: 'space-between',
      },
    },
    {
      props: {
        justEvenly: true,
      },
      expected: {
        justifyContent: 'space-evenly',
        WebkitJustifyContent: 'space-evenly',
      },
    },
    {
      props: {
        justAround: true,
      },
      expected: {
        justifyContent: 'space-around',
        WebkitJustifyContent: 'space-around',
      },
    },
    {
      props: {
        justStretch: true,
      },
      expected: {
        justifyContent: 'stretch',
        WebkitJustifyContent: 'stretch',
      },
    },
  ]

  for (const set of testSet) {
    const { style } = modsToStyle(set.props)
    for (const key of Object.keys(set.expected)) {
      t.true(Object.prototype.hasOwnProperty.call(style, key))
      t.deepEqual(style[key], set.expected[key])
    }
  }
})

test('Flex Direction Modifiers', t => {
  const testSet = [
    {
      props: {
        column: true,
      },
      expected: {
        flexDirection: 'column',
        WebkitBoxOrient: 'vertical',
        WebkitBoxDirection: 'normal',
      },
    },
    {
      props: {
        columnReverse: true,
      },
      expected: {
        flexDirection: 'column-reverse',
        WebkitBoxOrient: 'vertical',
        WebkitBoxDirection: 'reverse',
      },
    },
    {
      props: {
        row: true,
      },
      expected: {
        flexDirection: 'row',
        WebkitBoxOrient: 'horizontal',
        WebkitBoxDirection: 'normal',
      },
    },
    {
      props: {
        rowReverse: true,
      },
      expected: {
        flexDirection: 'row-reverse',
        WebkitBoxOrient: 'horizontal',
        WebkitBoxDirection: 'reverse',
      },
    },
  ]

  for (const set of testSet) {
    const { style } = modsToStyle(set.props)
    for (const key of Object.keys(set.expected)) {
      t.true(Object.prototype.hasOwnProperty.call(style, key))
      t.deepEqual(style[key], set.expected[key])
    }
  }
})

test('Flex Gap Generic', t => {
  const props = {
    'flex': true,
    'gap-2': true,
  }

  const expected = {
    display: 'flex',
    gap: '2px',
  }

  const { style } = modsToStyle(props, 'px')

  for (const key of Object.keys(expected)) {
    t.true(Object.prototype.hasOwnProperty.call(style, key))
    t.deepEqual(style[key], expected[key])
  }
})

test('Flex Gap Directional', t => {
  const props = {
    'flex': true,
    'gapX-2': true,
    'gapY-4': true,
  }

  const expected = {
    display: 'flex',
    rowGap: '4px',
    columnGap: '2px',
  }

  const { style } = modsToStyle(props, 'px')

  for (const key of Object.keys(expected)) {
    t.true(Object.prototype.hasOwnProperty.call(style, key))
    t.deepEqual(style[key], expected[key])
  }
})

test('Flex Gap Directional Float Numbers', t => {
  const props = {
    'flex': true,
    'gapX-0.2': true,
  }

  const expected = {
    display: 'flex',
    columnGap: '0.2px',
  }

  const { style } = modsToStyle(props, 'px')

  for (const key of Object.keys(expected)) {
    t.true(Object.prototype.hasOwnProperty.call(style, key))
    t.deepEqual(style[key], expected[key])
  }
})
