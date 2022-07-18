import React from 'react';
import "@testing-library/jest-dom";
import Cihui from './Cihui';
import {render, screen, waitForElementToBeRemoved} from '../../../setupTests';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

describe('Cihui component', () => {

    const nihao =  {
        characters: ['你', '好', '嗎'],
        chinese: "你好嗎",
        english: "hello",
        pinyin: ['ní', 'hǎo', 'mā'],
        readings: ['ni', 'hao', 'ma'],
        tones: ['2', '3', '1'],
        username: "tomtest2",
        __v: 0,
        _id: "62bdb3c57cd3790743696296"
    };

    const mockGetVocab = jest.fn();

    it('should render and only show the Chinese term', () => {
        render(
            <Cihui
                key={nihao._id}
                id={nihao._id}
                zh={nihao.chinese}
                readings={nihao.readings}
                characters={nihao.characters}
                english={nihao.english}
                pinyin={nihao.pinyin}
                tones={nihao.tones}
                getVocab={mockGetVocab}
             />
        );

        expect(screen.getByText(/你好嗎/i)).toBeInTheDocument();
        expect(screen.queryByText(/ní/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/hǎo/i)).not.toBeInTheDocument();
    });

    it('should open ReviewWord component on click and show the characters with the readings and translations', async () => {
        const user = userEvent.setup();
        render(
            <Cihui
                key={nihao._id}
                id={nihao._id}
                zh={nihao.chinese}
                readings={nihao.readings}
                characters={nihao.characters}
                english={nihao.english}
                pinyin={nihao.pinyin}
                tones={nihao.tones}
                getVocab={mockGetVocab}
             />
        );

        const text = screen.getByText(/你好嗎/i);

        await user.click(text);

        expect(await screen.findByText(nihao.english)).toBeInTheDocument();

        expect(await screen.findByText(nihao.characters[0])).toBeInTheDocument();
        expect(await screen.findByText(nihao.characters[1])).toBeInTheDocument();
        expect(await screen.findByText(nihao.characters[2])).toBeInTheDocument();

        expect(await screen.findByText(nihao.pinyin[0])).toBeInTheDocument();
        expect(await screen.findByText(nihao.pinyin[1])).toBeInTheDocument();
        expect(await screen.findByText(nihao.pinyin[2])).toBeInTheDocument();
    })

    it('should close ReviewWord component on second click and hide the readings and translations', async () => {
        const user = userEvent.setup();
        render(
            <Cihui
                key={nihao._id}
                id={nihao._id}
                zh={nihao.chinese}
                readings={nihao.readings}
                characters={nihao.characters}
                english={nihao.english}
                pinyin={nihao.pinyin}
                tones={nihao.tones}
                getVocab={mockGetVocab}
             />
        );

        const text = screen.getByText(/你好嗎/i);

        await user.click(text);

        const translation = await screen.findByText(nihao.english);

        await user.click(translation);

        await waitForElementToBeRemoved(translation);

        expect(await screen.findByText(/你好嗎/i)).toBeInTheDocument();
        expect(screen.queryByText(nihao.pinyin[0])).not.toBeInTheDocument();
        expect(screen.queryByText(nihao.pinyin[1])).not.toBeInTheDocument();
    })
})