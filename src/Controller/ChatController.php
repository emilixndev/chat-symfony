<?php

namespace App\Controller;


use App\Repository\MessageRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ChatController extends AbstractController
{


    #[Route(path: '/chat' , name:'app_chat_index')]
    public function index(): Response
    {
        return $this->render('chat.html.twig');
    }

    public function __construct(private MessageRepository $messageRepository)
    {
    }

    #[Route('/messages/{idConversation}')]
    public function messages(string $idConversation): JsonResponse
    {

        return new JsonResponse($this->messageRepository->getMessagesFromConversation(intval($idConversation)));
    }

}