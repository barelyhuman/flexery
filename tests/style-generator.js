import test from 'ava'
import {modsToStyle} from '../src/lib/mods-to-style.js'

test('Flex Prop | Single', (t) => {
	const props = {
		flex: true,
	}

	const expected = {
		display: 'flex',
	}

	const {style} = modsToStyle(props, 'px')
	t.deepEqual(style, expected)
})

test('Flex + Alignment Props', (t) => {
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

	const {style} = modsToStyle(props, 'px')
	t.deepEqual(style, expected)
})

test('Center Props | Singler', (t) => {
	const props = {
		flex: true,
		center: true,
	}

	const expected = {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
	}

	const {style} = modsToStyle(props, 'px')
	t.deepEqual(style, expected)
})

test('Center Props | Multiple', (t) => {
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

	const {style} = modsToStyle(props, 'px')
	t.deepEqual(style, expected)
})

test('Direction Alignments | All', (t) => {
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

	const {style} = modsToStyle(props, 'px')
	t.deepEqual(style, expected)
})

test('Flex One', (t) => {
	const props = {
		flex: true,
		'flex-1': true,
	}

	const expected = {
		display: 'flex',
		flex: '1',
	}

	const {style} = modsToStyle(props, 'px')
	t.deepEqual(style, expected)
})

test('Flex 10', (t) => {
	const props = {
		flex: true,
		'flex-10': true,
	}

	const expected = {
		display: 'flex',
		flex: '10',
	}

	const {style} = modsToStyle(props, 'px')
	t.deepEqual(style, expected)
})

test('Justify Distributed Alignment', (t) => {
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
			},
		},
		{
			props: {
				justAround: true,
			},
			expected: {
				justifyContent: 'space-around',
			},
		},
		{
			props: {
				justStretch: true,
			},
			expected: {
				justifyContent: 'stretch',
			},
		},
	]

	for (const set of testSet) {
		const {style} = modsToStyle(set.props)
		t.deepEqual(style, set.expected)
	}
})
