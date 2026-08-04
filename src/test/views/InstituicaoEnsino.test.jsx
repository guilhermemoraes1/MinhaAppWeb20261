import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InstituicaoEnsino from '../../views/InstituicaoEnsino';

describe('InstituicaoEnsino', () => {
  test('deve adicionar uma instituição ao clicar no botão Adicionar', () => {
    render(<InstituicaoEnsino />);

    // Inicialmente a instituição não deve existir
    expect(
      screen.queryByText('IFPB - Campus João Pessoa'),
    ).not.toBeInTheDocument();

    // Clica no botão
    fireEvent.click(screen.getByRole('button', { name: /adicionar/i }));

    // Agora a instituição deve aparecer na tabela
    expect(screen.getByText('IFPB - Campus João Pessoa')).toBeInTheDocument();

    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('600')).toBeInTheDocument();
  });
});
