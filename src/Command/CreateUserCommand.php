<?php

namespace App\Command;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

// the name of the command is what users type after "php bin/console"
#[AsCommand(name: 'app:create-user')]
class CreateUserCommand extends Command
{

    public function __construct( private EntityManagerInterface $entityManager)
    {
    }

    protected function configure(): void
    {
        $this
            // configure an argument
            ->addArgument('username', InputArgument::REQUIRED, 'The username of the user.')
            ->addArgument('password', InputArgument::REQUIRED, 'The password of the user.')
            // ...
        ;
    }
    protected function execute(InputInterface $input, OutputInterface $output) : int
    {
        $user = new User();
        $user->setUsername($input->getArgument('username'))
            ->setPassword($input->getArgument('password'));

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return Command::SUCCESS;


    }
}