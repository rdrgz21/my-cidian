import React from 'react';
import {server, rest} from '../../../mocks/server';
import "@testing-library/jest-dom";
import Vocab from './Vocab';
import {render, screen} from '../../../setupTests';
import '@testing-library/jest-dom/extend-expect';

describe('Vocab page', () => {

    it('should render with the loading text', async () => {
        render(<Vocab />);
        expect(await screen.findByText(/loading.../i)).toBeInTheDocument();
    })

    it('should display a list of vocabulary items once it has fetched', async () => {
        server.use(
            rest.get('/api/vocab/zh/test_user', async (req, res, ctx) => {
                return res(ctx.json({foundWords: [
                    {
                      characters: ['大', '家', '好'],
                      chinese: "大家好",
                      english: "hello everyone",
                      pinyin: ['dà', 'jiā', 'hǎo'],
                      readings: ['da', 'jia', 'hao'],
                      tones: ['4', '1', '3'],
                      username: "tomtest2",
                      __v: 0,
                      _id: "62bdb3c57cd3790743696296"
                    },
                    {
                      characters: ['大', '理', '石'],
                      chinese: "大理石",
                      english: "marble",
                      pinyin: ['dà', 'lǐ', 'shí'],
                      readings: ['da', 'li', 'shi'],
                      tones: ['4', '3', '2'],
                      username: "tomtest2",
                      __v: 0,
                      _id: "62acdb45c1e48c2ffa197792"
                    }
                  ]}))
            }),
          )

        render(<Vocab />, {user: 'test_user'});

        expect(await screen.findByText(/大家好/i)).toBeInTheDocument();
        expect(await screen.findByText(/大理石/i)).toBeInTheDocument();
    });
})