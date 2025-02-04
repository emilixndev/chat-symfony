<?php

namespace App\Controller;


use App\Entity\Message;
use App\Repository\ConversationRepository;
use App\Repository\MessageRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ChatController extends AbstractController
{


    public function __construct(
        private EntityManagerInterface $entityManager,
        private MessageRepository $messageRepository,
        private ConversationRepository $conversationRepository,
        private UserRepository $userRepository,
    )
    {
    }



    #[Route(path: '/chat' , name:'app_chat_index')]
    public function index(): Response
    {
        return $this->render('chat.html.twig');
    }


    #[Route('/messages/{idConversation}')]
    public function messages(string $idConversation): JsonResponse
    {

        return new JsonResponse($this->messageRepository->getMessagesFromConversation(intval($idConversation)));
    }

    #[Route('/messages/{idConversation}/send')]
    public function sendMessage(string $idConversation, Request $request): JsonResponse
    {
        $message = $request->get('message');
        $userId = $request->get('userId');
        $user = $this->userRepository->find(intval($userId));
        $conversation = $this->conversationRepository->find(intval($idConversation));

        if(null === $conversation){
            return new JsonResponse(['error'=>'The conversation was not found'],Response::HTTP_BAD_REQUEST);
        }
        if(null === $user){
            return new JsonResponse(['error'=>'The user was not found'],Response::HTTP_BAD_REQUEST);
        }
        $messageObject = new Message();
        $messageObject
            ->setUser($user)
            ->setContent($message)
            ->setConversation($conversation)
            ->setCreatedAt(new \DateTimeImmutable())
        ;

        $this->entityManager->persist($messageObject);
        $this->entityManager->flush();
        return new JsonResponse($this->messageRepository->getMessagesFromConversation(intval($idConversation)));
    }

}