import React from 'react';
import {AddChineseContext} from '../AddChinese';
import StageBullets from './StageBullets';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('StageBullets', () => {
    const state = {
        characters: ['你', '好']
    }

    beforeEach(() => {
        render(
            <AddChineseContext.Provider value={{ state }}>
              <StageBullets editingCharacter={1} />
            </AddChineseContext.Provider>
        )
    })
    
    it('should render as many bullets as there are characters in the state', async () => {
        const bullets = await screen.findAllByText('・');
        expect(bullets.length).toEqual(state.characters.length);

    })
    it('should apply the editingBullet styles if the corresponding character is currently being edited', async () => {
        const bullets = await screen.findAllByText('・');
        expect(bullets[1]).toHaveClass('editingBullet');

    })
})