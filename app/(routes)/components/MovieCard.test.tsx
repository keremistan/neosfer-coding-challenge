import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { it } from 'node:test'
import { MovieCard } from '@/app/(routes)/components/MovieCard'


test('MovieCard', () => {

    it('should render and match snapshot', () => {
        const res = render(<MovieCard movie={{ id: 1, title: 'Test Movie', comment: '', rating: 0, isInWishlist: false }} fetchMovies={() => { }} />)
        expect(res).toMatchSnapshot();
    })

})
