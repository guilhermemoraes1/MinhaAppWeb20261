import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InstituicaoEnsino from '../../views/InstituicaoEnsino';

describe('InstituicaoEnsino', () => {
  test('deve adicionar uma instituição ao submeter o formulário', async () => {
    const { container } = render(<InstituicaoEnsino />);

    // Inicialmente a instituição não deve existir
    expect(
      screen.queryByText('IFPB - Campus João Pessoa'),
    ).not.toBeInTheDocument();

    // Preenche o formulário
    fireEvent.change(container.querySelector('#nome'), {
      target: { value: 'IFPB - Campus João Pessoa' },
    });
    fireEvent.change(container.querySelector('#codigo'), {
      target: { value: '1000' },
    });
    fireEvent.change(container.querySelector('#qtMatricula'), {
      target: { value: '600' },
    });

    // Submete o formulário
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

    // Agora a instituição deve aparecer na tabela
    expect(
      await screen.findByText('IFPB - Campus João Pessoa'),
    ).toBeInTheDocument();

    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('600')).toBeInTheDocument();
  });
});
