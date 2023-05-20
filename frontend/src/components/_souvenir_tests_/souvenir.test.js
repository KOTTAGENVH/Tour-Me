import {render, screen, cleanup} from '@testing-library/react';
import viewSouvenir from '../viewSouvenir';

test('should render viewSouvenir component', ()=>{
    render(<viewSouvenir/>);
    const viewSouvenir=screen.getByTestId('viewSouvenir-1');
    expect(viewSouvenir).toBeInTheDocument();
})