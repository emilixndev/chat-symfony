<?php

namespace App\Repository;

use App\Entity\Message;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
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

    private function getSelectForConversation(QueryBuilder $qb)
    {
        return $qb->select('message.id AS messageId', 'message.content', 'conversation.id AS conversationId', 'user.username', 'user.id AS userId');
    }


    public function getMessagesFromConversation(int $idConversation)
    {

        $qb = $this->createQueryBuilder('message');
        $qb = $this->getSelectForConversation($qb);
        return $qb
            ->leftJoin('message.conversation', 'conversation')
            ->leftJoin('message.user', 'user')
            ->andWhere('conversation.id = :idConversation')
            ->setParameter('idConversation', $idConversation)
            ->getQuery()
            ->getArrayResult();
    }

    public function getLastMessageFromUser(int $idConversation, User $user)
    {
        $qb = $this->createQueryBuilder('message');
        $qb = $this->getSelectForConversation($qb);
        return $qb
            ->leftJoin('message.conversation', 'conversation')
            ->leftJoin('message.user', 'user')
            ->andWhere('conversation.id = :idConversation')
            ->setParameter('idConversation', $idConversation)
            ->andWhere('user = :user')
            ->setParameter('user', $user)
            ->orderBy('message.createdAt', 'DESC')
            ->setMaxResults(1)
            ->getQuery()
            ->getArrayResult();
    }

    public function findLastMessage($conversationId)
    {
        return

            $this->createQueryBuilder('message')
                ->select('message.content', 'message.createdAt','conversation.id AS conversationId')
                ->leftJoin('message.conversation', 'conversation')
                ->leftJoin('conversation.user', 'user')
                ->andWhere('conversation.id = :idConversation')
                ->setParameter('idConversation', $conversationId)
                ->orderBy('message.createdAt', 'DESC')
                ->setMaxResults(1)
                ->getQuery()
                ->getArrayResult();
    }


}
