<?php

namespace App\Repository;

use App\Entity\Message;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Message>
 */
class MessageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Message::class);
    }

    public function getMessagesFromConversation(int $idConversation)
    {

        return $this->createQueryBuilder('message')
            ->select('message.content', 'conversation.id AS conversationId', 'user.username', 'user.id AS usernameId')
            ->leftJoin('message.conversation', 'conversation')
            ->leftJoin('message.user', 'user')
            ->andWhere('conversation.id = :idConversation')
            ->setParameter('idConversation', $idConversation)
            ->orderBy('message.createdAt','DESC')
            ->getQuery()
            ->getArrayResult();
    }

}
